"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

const resend = new Resend(process.env.RESEND_API_KEY);

// ==========================================
// 1. تسجيل مستخدم جديد (Registration)
// ==========================================
export async function registerUser(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
    return { error: "All fields are required." };
  }

  if (password !== confirmPassword) return { error: "Passwords do not match." };
  if (password.length < 6) return { error: "Password must be at least 6 characters long." };

  try {
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) return { error: "Email already exists." };

    const existingUsername = await prisma.user.findUnique({ where: { username } });
    if (existingUsername) return { error: "Username is already taken." };

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create the user (emailVerified is null by default)
    const user = await prisma.user.create({
      data: { 
        email, username, firstName, lastName, password: hashedPassword, role: "USER" 
      }
    });

    // Generate a secure random token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours expiry

    // Store token in database
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: token,
        expires: expires,
      }
    });

    // Send Email via Resend
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`;
    
    await resend.emails.send({
      from: 'ForexMax <auth@forexmax.com>',
      to: email,
      subject: 'Verify your ForexMax Account',
      html: `<p>Welcome ${firstName}! Please verify your email to activate your account.</p>
             <a href="${verificationLink}" style="display:block; padding:12px 24px; background: #10b981; color:white; border-radius:8px; text-decoration:none; font-weight:bold;">Verify Email Address</a>`
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Something went wrong during registration." };
  }
}

// ==========================================
// 2. التحقق من الإيميل (Email Verification)
// ==========================================
export async function verifyEmail(token: string) {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token }
    });

    if (!verificationToken || verificationToken.expires < new Date()) {
      return { error: "Invalid or expired verification token." };
    }

    // Mark user as verified
    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: new Date() }
    });

    // Delete the token so it can't be used again
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id }
    });

    return { success: true };
  } catch (error) {
    return { error: "An error occurred during verification." };
  }
}

// ==========================================
// 3. طلب استعادة كلمة المرور (Forgot Password)
// ==========================================
export async function requestPasswordReset(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) return { error: "Email is required." };

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { error: "No account found with this email address." };

    // Generate secure token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 Hour expiration

    // Store token in DB
    await prisma.passwordResetToken.create({
      data: {
        identifier: email,
        token: token,
        expires: expires,
      },
    });

    // Send email via Resend
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
    
    await resend.emails.send({
      from: 'ForexMax <auth@forexmax.com>',
      to: email,
      subject: 'Reset Your ForexMax Password',
      html: `<p>Hello, you requested a password reset for your account.</p>
             <a href="${resetLink}" style="display:block; padding:12px 24px; background: #10b981; color:white; border-radius:8px; text-decoration:none; font-weight:bold;">Reset Password Now</a>
             <p>This link will expire in 1 hour.</p>`
    });

    return { success: true };
  } catch (error) {
    console.error("Reset request error:", error);
    return { error: "An error occurred. Please try again later." };
  }
}

// ==========================================
// 4. تعيين كلمة مرور جديدة (Reset Password)
// ==========================================
export async function resetPassword(formData: FormData) {
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!token || !password || !confirmPassword) {
    return { error: "All fields are required." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long." };
  }

  try {
    // Verify token and expiration
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token }
    });

    if (!resetToken || resetToken.expires < new Date()) {
      return { error: "This reset link is invalid or has expired." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user and delete token in a single transaction
    await prisma.$transaction([
      prisma.user.update({
        where: { email: resetToken.identifier },
        data: { password: hashedPassword },
      }),
      prisma.passwordResetToken.delete({
        where: { id: resetToken.id },
      }),
    ]);

    return { success: true };
  } catch (error) {
    console.error("Password reset error:", error);
    return { error: "An error occurred while updating your password." };
  }
}
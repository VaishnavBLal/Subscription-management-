import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Brightloop Database Seeding...");

  // 1. Clean existing records
  await prisma.payment.deleteMany();
  await prisma.invoiceLine.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.discountRule.deleteMany();
  await prisma.taxRule.deleteMany();
  await prisma.subscriptionLine.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.quotationTemplateLine.deleteMany();
  await prisma.quotationTemplate.deleteMany();
  await prisma.plan.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.passwordResetToken.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Users
  const adminPassword = await bcrypt.hash("Admin@Brightloop123!", 10);
  const staffPassword = await bcrypt.hash("Staff@Brightloop123!", 10);
  const customerPassword = await bcrypt.hash("Customer@Brightloop123!", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Admin Abhinav",
      email: "admin@brightloop.com",
      passwordHash: adminPassword,
      role: "ADMIN",
    },
  });

  const staff = await prisma.user.create({
    data: {
      name: "Internal Staff Member",
      email: "staff@brightloop.com",
      passwordHash: staffPassword,
      role: "STAFF",
    },
  });

  const customer = await prisma.user.create({
    data: {
      name: "Acme Enterprises",
      email: "customer@example.com",
      passwordHash: customerPassword,
      role: "CUSTOMER",
    },
  });

  console.log(`✅ Seeded Users:
  - Admin:    ${admin.email} (Password: Admin@Brightloop123!)
  - Staff:    ${staff.email} (Password: Staff@Brightloop123!)
  - Customer: ${customer.email} (Password: Customer@Brightloop123!)`);

  // 3. Seed Base Product with Brand Variant (Scene 2 from PDF)
  const product = await prisma.product.create({
    data: {
      name: "Brightloop Enterprise Suite",
      type: "SOFTWARE",
      salesPrice: 1000.0,
      costPrice: 400.0,
      notes: "Core enterprise subscription module with variant pricing.",
      variants: {
        create: [
          {
            attributeName: "Brand",
            attributeValue: "Odoo",
            priceAdjustment: 560.0,
          },
          {
            attributeName: "Brand",
            attributeValue: "Standard",
            priceAdjustment: 0.0,
          },
        ],
      },
    },
  });

  // 4. Seed Base Plan (Scene 2 from PDF)
  const plan = await prisma.plan.create({
    data: {
      name: "Enterprise Monthly Plan",
      billingFrequency: "MONTHLY",
      price: 1560.0,
      minQuantity: 1,
      autoCloseOnEnd: true,
      allowEarlyClose: true,
      allowPause: true,
      renewable: true,
    },
  });

  // 5. Seed Tax Rule & Discount Rule
  await prisma.taxRule.create({
    data: {
      name: "Standard VAT 10%",
      rate: 10.0,
      isActive: true,
    },
  });

  await prisma.discountRule.create({
    data: {
      code: "LAUNCH20",
      description: "20% Launch discount for new subscribers",
      type: "PERCENTAGE",
      value: 20.0,
      minPurchaseAmount: 500.0,
      scope: "SUBSCRIPTION",
      isActive: true,
    },
  });

  console.log("✅ Seeded initial catalog, plan, tax rule, and discount rule.");
  console.log("✨ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

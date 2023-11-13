-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "cart" JSONB NOT NULL,
    "changeReturn" TEXT NOT NULL,
    "discount" INTEGER NOT NULL,
    "grandTotal" INTEGER NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "receivedAmount" INTEGER NOT NULL,
    "shipping" INTEGER NOT NULL,
    "tax" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

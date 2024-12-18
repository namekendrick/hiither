-- CreateTable
CREATE TABLE "OneTimeToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OneTimeToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OneTimeConfirmation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "OneTimeConfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OneTimeToken_token_key" ON "OneTimeToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "OneTimeToken_email_token_key" ON "OneTimeToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "OneTimeConfirmation_userId_key" ON "OneTimeConfirmation"("userId");

-- AddForeignKey
ALTER TABLE "OneTimeConfirmation" ADD CONSTRAINT "OneTimeConfirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "pet" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characteristic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "characteristic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pet_characteristic" (
    "id" SERIAL NOT NULL,
    "pet_id" TEXT NOT NULL,
    "characteristic_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "pet_characteristic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_characteristic" ADD CONSTRAINT "pet_characteristic_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_characteristic" ADD CONSTRAINT "pet_characteristic_characteristic_id_fkey" FOREIGN KEY ("characteristic_id") REFERENCES "characteristic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

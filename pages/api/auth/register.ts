import { hash } from "bcryptjs"; // Şifreyi hashlemek için kullanıyoruz
import { db } from "@/shared/utils/db"; // Prisma client
import { NextApiRequest, NextApiResponse } from "next";
import { signIn } from "next-auth/react"; // NextAuth signIn fonksiyonu
import nc from "next-connect"; // next-connect'i kullanıyoruz
import onError from "@/shared/middleware/error"; // Hata yönetimi için middleware

// Next-Connect handler'ını oluşturuyoruz
const handler = nc<NextApiRequest, NextApiResponse>({
  onError,
});

handler.post(async (req, res) => {
  const { name, email, phone, password, taskGroup, companyId,role } = req.body;

  // Verilerin doğruluğunu kontrol et
  if (!name || !email || !password || !taskGroup || !companyId) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  console.log(req.body)


  try {
    // Şifreyi hash'le
    const hashedPassword = await hash(password, 10);

    // Yeni kullanıcı oluştur
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role, // Varsayılan olarak EMPLOYEES rolü atanıyor
        image: "", // Zorunlu image alanını ekliyoruz (boş bırakabilirsiniz)
        employeeCompany: {
          connect: {
            id: companyId, // TaskGroup ile ilişkili şirketi bağlıyoruz
          },
        }
      },
    });

  

    return res.status(201).json({ message: "User registered and logged in successfully", user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while registering the user" });
  }
});

export default handler;

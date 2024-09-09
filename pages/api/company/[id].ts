import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import middleware from "@/shared/middleware/all";
import onError from "@/shared/middleware/error";
import { Request } from "../types";

const handler = nc<Request, NextApiResponse>({
  onError,
});

handler.use(middleware);

// Şirketlerin tamamını ya da spesifik bir şirketi almak için kullanılır
handler.get(async (req, res) => {
  try {
    // Query string'den companyId alıyoruz (spesifik bir şirketi sorgulamak için)
    const { id } = req.query;
    // Eğer companyId varsa, spesifik bir şirketi getiriyoruz
    if (id) {
      const company = await req.db.company.findUnique({
        where: {
          id: id as string,
        },
        include: {
          employees: true,
          owners: true,
        },
      });

      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }

      return res.status(200).json(company);
    }

  

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    return error;
  }
});

export default handler;

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'http://localhost:3001/',
    LIOREN_TOKEN: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3OTMiLCJqdGkiOiJlM2Y0YWQ2MTc0NjkzMTMyNDNiNWYxODdmM2I1OGEzNzM2MTg2ODlhOGUzZjFhNTgyMzcwMjNkMmE0YjdmODhiMTlmMmFkZmVlNmMyNGQ2YyIsImlhdCI6MTcxNjM2NjAwMi44NTYwNDIsIm5iZiI6MTcxNjM2NjAwMi44NTYwNDUsImV4cCI6MTc0NzkwMjAwMi44MzQzNTMsInN1YiI6IjU5NzYiLCJzY29wZXMiOltdfQ.RhWXcCNI9vu5f7Yv5J7m4HNJ0ztk5zNW8Yzrk21YRQQZekwDdmRaQNYvXYfKcoBRAYVpYoDK2qac-YXW0IkdYkx5KnjsaX5O6MkrEtuZXgPYc26MUHX26MW2KMD64rVckCvbCtsYjXP5-4CUA_yKlZNv7eAHT-SqK3Xj_DNil7jjOOcWmb5AWTAima8cSD59C_0X-wl_3ksjaFVU8MbwKNNiBKGnBZriNeyjx-QGswa119VdhbbhGCVsqroaLwnjhEfAfHtlPCf2XDlxhy6z_tDAsgiXDDVeTM335xmHnPO6Z2n253w_5CgMg3xWQCa4leC98wO61aD2FsEEn1H19pWTmZnbccvcK0FsmhFodqnIwhQR0yBMIbSA40mN_Dcxi7Yzo95GmV1W6H-gYAqjSUxomvaTc57Fb-KvqsdyyDtHvMLigaP3pQT9uQEQj3rEj1LyJHdSF2vx1i347SPEYgrazQdlWdFRSlh_uuobXf3jY_M1_tZq_GfXGtxFchj5Q900uMMC1ad0n9lAi9E7ESq1GqsBq95AtAtXOP5f7oqtauRchrMmEBQuuo2kGiKn4OoC6F7_QvTZiHkhoib7Jpy--U2qPlu6NbY5TtmjX1Lg3JxLHqLworiHEfQXGZ78sNRsXLXgKSUMXxdwmxXD9fFE9gqxeSagL5OSBj2AqXo"
  },
  async rewrites() {
    return [
      {
        source: "/lioren/comunas",
        destination: "https://www.lioren.cl/api/comunas",
      },
      {
        source: "/lioren/ciudades",
        destination: "https://www.lioren.cl/api/ciudades",
      },
      {
        source: "/lioren/boletas",
        destination: "https://www.lioren.cl/api/boletas",
      }
    ];
  },
};



export default nextConfig;

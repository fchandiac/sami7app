/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    //Corral
    //API_URL: "https://api.corraltab.cl/",

    //Test
    //API_URL: "http://localhost:3001/",

    //Real Trimact
    API_URL: "https://192.168.1.100:3001/",
    //TEST_CORRAL_TAB
    //LIOREN_TOKEN:"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4NDciLCJqdGkiOiI4Y2I4ZmRmMDQ4OGRhZTEzZjRjMjMzMDJhNjY0NjE1OWUyNzVmZjQ5OWQxNDk4ZmFiZWJjNTA5MWViNDMxYmIyZWZiMTI0YWY0MDdkNTRhZiIsImlhdCI6MTcyMjM1NjE1OS4yNDQ5MzMsIm5iZiI6MTcyMjM1NjE1OS4yNDQ5MzQsImV4cCI6MTc1Mzg5MjE1OS4yNDI4NTIsInN1YiI6Ijc1MjQiLCJzY29wZXMiOltdfQ.Lkl5ROr7lmvFCEjPIef5tT9w9L_fs4n3DKwzcj8l-LF-HDiG_Zl0NVIEpvVc7i2Yml5XGL7oAeiNJNj544R3cShCO4gvMPy8QXRA75RvDeZP3UsW-ugWjFYhQbKR1EVRuZFeCEuhAQIcbn5qRCqERqKx6K5tFM6tIbx8j3tfOi-_EV3mYJmv_CM-AW9cygNVSFncJHDyZae376uhPQfyWhgW8e40FrpyxkUjeqKH4zkMQNvTiSGZZiYLdwIZ4WZEGcjYzIilEIMD_3GQbqaZSzWuahD7zuqi2JUtYI17BhAhXBIhsLUpSgPwrmtnaN7_TJhRDnRpNtdIaTmTCUt6KGmUzK_E1zMoWxS-j2RNrGT_mdnXt4iLrPAQ1nuCcC8kQmIV2CXk15ylFhMN17poEEoakbx1eYFScEXo-m5yZrjnxh8d2IHfYeRWlUkutbdo0VNMY9LQKH3gNc-HRa_g8duLJq2cvtLXFV5oi35REgUD4HTkl92JoqrbgabESieA1daawCbvjTcgJ-BZmj8LyfacnARzIq06-mAsTKarEYfWcT_WPrNzM_iPP8mbthmO74L6sMl601Cgcewg7I1N1lP3uYzPdZsdFmM8BHaSgJmTwu-QK12soTvl4lTDu6HSip9fwfRsm7XPz-ZPjWD8_yWhimmvHIhF_GRzZXPloFc"
    //TEST
    //LIOREN_TOKEN:
    //  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3OTMiLCJqdGkiOiJlM2Y0YWQ2MTc0NjkzMTMyNDNiNWYxODdmM2I1OGEzNzM2MTg2ODlhOGUzZjFhNTgyMzcwMjNkMmE0YjdmODhiMTlmMmFkZmVlNmMyNGQ2YyIsImlhdCI6MTcxNjM2NjAwMi44NTYwNDIsIm5iZiI6MTcxNjM2NjAwMi44NTYwNDUsImV4cCI6MTc0NzkwMjAwMi44MzQzNTMsInN1YiI6IjU5NzYiLCJzY29wZXMiOltdfQ.RhWXcCNI9vu5f7Yv5J7m4HNJ0ztk5zNW8Yzrk21YRQQZekwDdmRaQNYvXYfKcoBRAYVpYoDK2qac-YXW0IkdYkx5KnjsaX5O6MkrEtuZXgPYc26MUHX26MW2KMD64rVckCvbCtsYjXP5-4CUA_yKlZNv7eAHT-SqK3Xj_DNil7jjOOcWmb5AWTAima8cSD59C_0X-wl_3ksjaFVU8MbwKNNiBKGnBZriNeyjx-QGswa119VdhbbhGCVsqroaLwnjhEfAfHtlPCf2XDlxhy6z_tDAsgiXDDVeTM335xmHnPO6Z2n253w_5CgMg3xWQCa4leC98wO61aD2FsEEn1H19pWTmZnbccvcK0FsmhFodqnIwhQR0yBMIbSA40mN_Dcxi7Yzo95GmV1W6H-gYAqjSUxomvaTc57Fb-KvqsdyyDtHvMLigaP3pQT9uQEQj3rEj1LyJHdSF2vx1i347SPEYgrazQdlWdFRSlh_uuobXf3jY_M1_tZq_GfXGtxFchj5Q900uMMC1ad0n9lAi9E7ESq1GqsBq95AtAtXOP5f7oqtauRchrMmEBQuuo2kGiKn4OoC6F7_QvTZiHkhoib7Jpy--U2qPlu6NbY5TtmjX1Lg3JxLHqLworiHEfQXGZ78sNRsXLXgKSUMXxdwmxXD9fFE9gqxeSagL5OSBj2AqXo",
    //REAL trimath
    LIOREN_TOKEN: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3OTEiLCJqdGkiOiI1ZTg4ZGUxMTFhMWQxY2E3MzljN2Q3Yzc5MWQ2NGU0YzYwZTE0Y2JjODU4YTg2NGZmOTVmMTE2NmIxNDk1ZDg3MmVmYTY4OGFhMGJmZTRhZSIsImlhdCI6MTcxNTUyODY2Mi45MjM5NjUsIm5iZiI6MTcxNTUyODY2Mi45MjM5NjcsImV4cCI6MTc0NzA2NDY2Mi45MTk5MDEsInN1YiI6IjU5NzYiLCJzY29wZXMiOltdfQ.oFaqejklZ73-PIAFNQimh151b-kO1HTiGoznDBshqxvmotH0HSx60YO7psNzMTXLanMmcGByIfa5IyKJOrr65_CvrRxbtFrQrwaXZkoPYjXW4E9_vmnVzUKYArGH8s9ZMwzztGZIL5ELyIRe-wOqG04y06K6PK4boxHWONTZhnniiO8aKOKrl7y15zGqM7SMatc_mlp_CqjlgQwnFuoZsPh3bMESTqQdvj_CLVAbPdzyVimsKKkXwjG2kPNGSQPlUrJzy7Kqe7hnznc2hEHzhpIvE4X5ulHnRaQnTgKl1cPCNpC8niqPQbdswVrOSQsnekYbzux0CFZftwoTAS0d-67utAhXISexVNH5UEb2d9UraSHQQPjAy7NEFk2Y-aSzJvNPy_sBa0Moq0QIlS_3jbY2uiXKvg190KAmS4-BHrYbhc-1vIuT6ySsrIxHAMrSFlTip54piDrTeS2RBlXRJ9t6x0glzOQZ2Zqm1EqIFvUZw0vOXR7Zs_45JG4lX3t3eBoQZHa7mXmbMVp98FqQNrgWWvBxY7wFZzheCl69wETo8Nls-hjjWWVkBiJhXcmTYplnBASpZI6zP_83zMbCByhKqJiY_IfYaV3pUmzoJuHNrlxgra4e6oKswYIZJW5G9mWth97uA74gjViNl5RXSIc9l6t_Z-ysxbqAdgxiQhA"
    //FAIL
    //LIOREN_TOKEN: "ERROR",
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
      },
      {
        source: "/lioren/facturas",
        destination: "https://www.lioren.cl/api/dtes",
      },
    ];
  },
};

export default nextConfig;

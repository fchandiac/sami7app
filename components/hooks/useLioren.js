const lioren = require("@/services/lioren");

export default function useLioren() {
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI2MTMiLCJqdGkiOiJlZDEwOTQyZjY2Yjc5NDUyNGZiYjVmYzZiY2U5ODBmM2IxNTQwNzBhNWVkYzRhOGJjMjYyZDk0MDIyNzhhNDM5YWI0MTdhOThhZDQwMzk2YiIsImlhdCI6MTY4NDI5NDU0MC41MjY1ODgsIm5iZiI6MTY4NDI5NDU0MC41MjY1OSwiZXhwIjoxNzE1OTE2OTQwLjUyNDY3OCwic3ViIjoiNTk3NiIsInNjb3BlcyI6W119.PlKuUXIbR9MOMRHafqRSN-1BleRXNlcp6eX-MJfSJGPw4ndszGSTYTZoycPLx0sGLPBatXSGNKUzVGj_Yt4tHaw2oJy0PFImkmfJE6Cdb1V-ErTe4GSdKlG9YT2Shf8P_SfkUv6JFuhg-a4ef38MTQSFVNKjK6u7m719VMzjDsZHYpJnqbgOlyUb7HX3rVrq8kdtgzbXjwJrfo-TWZCY6faP0XzsuZWi4Ozma0aMj9nfePneaNqOMF2-26bn_eXmOIZspoyQeg324YFf_ZVtn4zf8pyurEdSwew88KO3ccgIVAFZjjIHXIseV5sqtIoFkDUYH5V2Fwn5KSXbXn8cywTq-5KYE05nOFs4Y0m-bqp6UJNMxedrV8yO57iHlGJ6DpeeF_JU5svZMPHoBMvlUn9PPrJqB6PL-wyNJCwLh9P2ekdCz8RJEePfdGj6tSVOPxGCHBCBiEeSTEeQfrv6Yy-mggoAebuxJ0YsYBtl37itEVC3UBtJq9DLb1s7hijjm3NG6Y-bBjiGmzlZjlbW-NY-D17ja9jPKXcAIb6OPA9Um0Irb9bqFIk-HbgCXr7pVaG3ljWOYNtFxqsNpsRIsQV0KR2sZsUuUyVIn8zXdwizgX4w3XSGqgiUMP0EXZ3zzw7KEM93pDlYPgDmgHCxQPYkhgF1u6OnOnKyJeSaPrE";

  const states = async () => {
    const states_data = await lioren.states(token);
    return states_data;
  };

  const district = async () => {
    const district_data = await lioren.district(token);
    return district_data;
  };

  const cities = async () => {
    const cities_data = await lioren.cities(token);
    return cities_data;
  }

  const citiesByDistrict = async (district_id) => {
    const cities_data = await lioren.cities(token)
    const citiesByDistrict = cities_data.filter(city => city.region_id === district_id)
    return cities_data;
  }

  const boleta = async (data) => {
    const boleta_data = await lioren.boleta(data);
    return boleta_data;
  }


  return {
    states,
    district,
    cities,
    citiesByDistrict,
    boleta

  };
}

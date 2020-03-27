import connection from "../database/connection";
import { randomBytes } from "crypto";

export default {
	async index(req, res) {
		const { page = 1 } = req.query;

		const [count] = await connection("ongs").count();

		res.header("X-Total-Count", count["count(*)"]);

		return res.json(
			await connection("ongs")
				.limit(5)
				.offset((page - 1) * 5)
				.select("*")
		);
	},

	async store(req, res) {
		const { name, email, whatsapp, city, uf } = req.body;
		const id = randomBytes(4).toString("HEX");

		await connection("ongs").insert({
			id,
			name,
			email,
			whatsapp,
			city,
			uf,
		});

		return res.json({ id });
	},
};

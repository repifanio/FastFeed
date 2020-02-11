import Courier from '../models/Courier';
import File from '../models/File';

class CourierController {
  async index(req, res) {
    const couriers = await Courier.findAll({
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.json(couriers);
  }

  async show(req, res) {
    const couriers = await Courier.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.json(couriers);
  }

  async store(req, res) {
    const { name, avatar_id, email } = req.body;

    const courier = await Courier.create({
      name,
      avatar_id,
      email,
    });

    return res.json(courier);
  }

  async update(req, res) {
    const { id } = req.params;

    const courier = await Courier.findByPk(id);

    if (!courier) {
      return res.status(400).json({ error: 'Courier not found.' });
    }

    const newCourier = await courier.update(req.body);

    return res.json({ newCourier });
  }

  async destroy(req, res) {
    const courier = await Courier.findByPk(req.params.id);

    if (!courier) {
      return res
        .status(400)
        .json({ message: `Can't find courier whit this cpf.` });
    }
    await courier.destroy();

    return res.json({ message: 'Courier delete with sucess.' });
  }
}

export default new CourierController();

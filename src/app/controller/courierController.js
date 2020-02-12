import Courier from '../models/Courier';
import File from '../models/File';
import Delivery from '../models/Delivery';

class CourierController {
  async index(req, res) {
    const couriers = await Delivery.findAll({
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
    const { name, email } = req.body;

    const courier = await Courier.create(req.body);

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

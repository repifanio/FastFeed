import Delivery from '../models/Delivery';

class DeliveryController {
  async index(req, res) {
    const delivery = await Delivery.findAll();

    return res.json(delivery);
  }

  async show(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);
    return res.json(delivery);
  }

  async store(req, res) {
    const { product, start_date } = req.body;

    const delivery = await Delivery.create(req.body);

    return res.json(delivery);
  }

  async update(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    const deliveryUp = await delivery.update(req.body);

    return res.json(deliveryUp);
  }

  async destroy(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    await delivery.destroy();

    return res.json({ message: 'Delivery delete.' });
  }
}

export default new DeliveryController();

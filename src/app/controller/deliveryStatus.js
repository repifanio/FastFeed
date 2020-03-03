import * as Yup from 'yup';

import Delivery from '../models/Delivery';

class DeliveryStatus {
  async startDelivery(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'validation fails' });
    }

    const { id } = req.params;

    const delivery = Delivery.findByPk(id);
    if (!delivery) {
      return res.status(400).json({ error: 'delivery not found with this ID' });
    }

    const newDelivery = Delivery.update(req.body);

    return res.json(newDelivery);
  }

  async endDelivery(req, res) {
    const schema = Yup.object().shape({
      end_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'validation fails' });
    }

    const { id } = req.params;

    const delivery = Delivery.findByPk(id);
    if (!delivery) {
      return res.status(400).json({ error: 'delivery not found with this ID' });
    }

    const newDelivery = Delivery.update(req.body);

    return res.json(newDelivery);
  }

  async cancelDelivery(req, res) {
    const schema = Yup.object().shape({
      canceled_at: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'validation fails' });
    }

    const { id } = req.params;

    const delivery = Delivery.findByPk(id);
    if (!delivery) {
      return res.status(400).json({ error: 'delivery not found with this ID' });
    }

    const newDelivery = Delivery.update(req.body);

    return res.json(newDelivery);
  }
}

export default new DeliveryStatus();

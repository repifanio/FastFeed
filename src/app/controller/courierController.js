import * as Yup from 'yup';

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

    if (!couriers) {
      return res.status(400).json({ erro: 'Courrier not found with this ID' });
    }

    return res.json(couriers);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .required()
        .email(),
    });

    /**
     * Validation if has name and cpf valid on req.body
     */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    /**
     * Validation if req.email don't has on database to another courier
     */
    const { email } = req.body;

    const validEmail = await Courier.findOne({ where: { email } });

    if (validEmail) {
      return res
        .status(400)
        .json({ error: 'This email already in use for another courrier' });
    }

    const courier = await Courier.create(req.body);

    return res.json(courier);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    /**
     * validate if email and name are valids
     */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    /**
     * valid of id is valid
     */
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
        .json({ message: `Can't find courier whit this id.` });
    }
    await courier.destroy();

    return res.json({ message: 'Courier delete with sucess.' });
  }
}

export default new CourierController();

import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Courier from '../models/Courier';
import File from '../models/File';
import Recipient from '../models/Recipient';

class DeliveryController {
  async index(req, res) {
    const delivery = await Delivery.findAll({
      where: {
        end_date: null,
        canceled_at: null,
      },
      include: [
        {
          model: Courier,
          as: 'courier',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'nome',
            'cpf',
            'rua',
            'numero',
            'complemento',
            'estado',
            'cidade',
            'cep',
          ],
        },
      ],
    });

    return res.json(delivery);
  }

  async show(req, res) {
    const delivery = await Delivery.findByPk(req.params.id, {
      include: [
        {
          model: Courier,
          as: 'courier',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'nome',
            'cpf',
            'rua',
            'numero',
            'complemento',
            'estado',
            'cidade',
            'cep',
          ],
        },
      ],
    });

    if (!delivery) {
      return res
        .status(400)
        .json({ error: 'delivery not found whith this ID' });
    }

    return res.json(delivery);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      courier_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    /**
     * validation the values of req
     */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation is fails' });
    }

    const delivery = await Delivery.create(req.body);

    return res.json(delivery);
  }

  async destroy(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res
        .status(400)
        .json({ error: 'delivery not found whith this ID' });
    }

    await delivery.destroy();

    return res.json({ message: 'Delivery delete.' });
  }
}

export default new DeliveryController();

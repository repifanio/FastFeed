import * as Yup from 'yup';
import { isBefore, parseISO, startOfHour } from 'date-fns';

import Delivery from '../models/Delivery';
import Courier from '../models/Courier';
import Mail from '../../lib/Mail';

class DeliveryStatus {
  async startDelivery(req, res) {
    // Inicio da validação das informações de entrada
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'validation fails' });
    }
    // Fim da validação das informações de entradas

    // Inicio da validação da horas (se maior que 8 e menor que 18)
    const { start_date } = req.body;

    const startDateDay = new Date();
    const endDateDay = new Date();

    startDateDay.setHours(5);
    endDateDay.setHours(15);

    if (
      isBefore(parseISO(start_date), startOfHour(startDateDay)) ||
      isBefore(startOfHour(endDateDay), parseISO(start_date))
    ) {
      return res.status(400).json({ error: 'This hour is not valid.' });
    }
    // Fim da validação de horas

    const { id } = req.params;

    // Inicio da validação se existe uma entrega com esse ID
    const delivery = await Delivery.findByPk(id, {
      include: [
        {
          model: Courier,
          as: 'courier',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'delivery not found with this ID' });
    }
    // Fim da validação se existe esse ID

    // Update da entrega
    const newDelivery = await delivery.update(req.body);

    // Envio do email
    await Mail.sendMail({
      to: `${newDelivery.courier.name} <${newDelivery.courier.email}>`,
      subject: 'New Delivery for you',
      text: 'A new delivery is add for you. Good Job!',
    });

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

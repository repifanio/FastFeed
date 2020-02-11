import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    return res.json(await Recipient.findAll());
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      cpf: Yup.string()
        .required()
        .min(11)
        .max(14),
      rua: Yup.string().required(),
      numero: Yup.number().required(),
      estado: Yup.string()
        .max(2)
        .min(2),
      cidade: Yup.string(),
      cep: Yup.string()
        .required()
        .min(9)
        .max(9),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { cpf } = req.body;

    const recipientFind = await Recipient.findOne({
      where: {
        cpf,
      },
    });

    if (recipientFind) {
      return res.status(400).json({
        message: `This recipient already in dataBase with ID ${recipientFind.nome}`,
      });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      cpf: Yup.string()
        .required()
        .min(11)
        .max(14),
      rua: Yup.string(),
      numero: Yup.number(),
      estado: Yup.string()
        .max(2)
        .min(2),
      cidade: Yup.string(),
      cep: Yup.string()
        .min(9)
        .max(9),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { cpf } = req.body;

    const recipientFind = await Recipient.findOne({
      where: {
        cpf,
      },
    });

    if (!recipientFind) {
      return res.status(400).json({
        message: `This addres not found on system for this CPF.`,
      });
    }

    const recipient = await recipientFind.update(req.body);

    return res.json(recipient);
  }

  async show(req, res) {
    const recipientFind = await Recipient.findOne({
      where: {
        cpf: req.params.cpf,
      },
    });

    if (!recipientFind) {
      return res
        .status(400)
        .json({ message: `Can't find recipient with this cpf.` });
    }

    return res.json(recipientFind);
  }

  async destroy(req, res) {
    const recipient = await Recipient.findOne({
      where: { cpf: req.params.cpf },
    });

    if (!recipient) {
      return res
        .status(400)
        .json({ message: `Can't find recipient whit this cpf.` });
    }
    await recipient.destroy();

    return res.json({ message: 'Recipient delete with sucess.' });
  }
}

export default new RecipientController();

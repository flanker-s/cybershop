import { Request, Response, NextFunction } from 'express';
import PaymentMethod from '../../models/PaymentMethod.js';

const createPaymentMethod = (req: Request, res: Response, next: NextFunction) => {

    const { name } = req.body;
    const paymentMethod = new PaymentMethod({ name });

    return paymentMethod.save()
        .then(paymentMethod => res.status(201).json({ paymentMethod }))
        .catch(err => res.status(500).json({ err }));
}

const readPaymentMethod = (req: Request, res: Response, next: NextFunction) => {

    const paymentMethodId = req.params.paymentMethodId;

    return PaymentMethod.findById(paymentMethodId)
        .then(paymentMethod => paymentMethod ? res.status(200).json({ paymentMethod })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

const readAllPaymentMethodItems = (req: Request, res: Response, next: NextFunction) => {
    return PaymentMethod.find()
        .then(paymentMethodItems => res.status(200).json({ paymentMethodItems }))
        .catch(err => res.status(500).json({ err }));
}

const updatePaymentMethod = (req: Request, res: Response, next: NextFunction) => {

    const paymentMethodId = req.params.paymentMethodId;

    return PaymentMethod.findById(paymentMethodId)
        .then((paymentMethod) => {
            if (paymentMethod) {
                paymentMethod.set(req.body);

                return paymentMethod.save()
                    .then(paymentMethod => res.status(200).json({ paymentMethod }))
                    .catch(err => res.status(500).json({ err }));
            } else {
                return res.status(404).json({ message: 'Not found' });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const deletePaymentMethod = (req: Request, res: Response, next: NextFunction) => {

    const paymentMethodId = req.params.paymentMethodId;

    return PaymentMethod.findByIdAndDelete(paymentMethodId)
        .then(paymentMethod => paymentMethod ? res.status(204).json({ message: 'deleted' })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

export default { createPaymentMethod, readPaymentMethod, readAllPaymentMethodItems, updatePaymentMethod, deletePaymentMethod }
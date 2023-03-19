import { Request, Response, NextFunction } from 'express';
import DeliveryMethod from '../../models/DeliveryMethod.js';

const createDeliveryMethod = (req: Request, res: Response, next: NextFunction) => {

    const { name } = req.body;
    const deliveryMethod = new DeliveryMethod({ name });

    return deliveryMethod.save()
        .then(deliveryMethod => res.status(201).json({ deliveryMethod }))
        .catch(err => res.status(500).json({ err }));
}

const readDeliveryMethod = (req: Request, res: Response, next: NextFunction) => {

    const deliveryMethodId = req.params.deliveryMethodId;

    return DeliveryMethod.findById(deliveryMethodId)
        .then(deliveryMethod => deliveryMethod ? res.status(200).json({ deliveryMethod })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

const readAllDeliveryMethodItems = (req: Request, res: Response, next: NextFunction) => {
    return DeliveryMethod.find()
        .then(deliveryMethodItems => res.status(200).json({ deliveryMethodItems }))
        .catch(err => res.status(500).json({ err }));
}

const updateDeliveryMethod = (req: Request, res: Response, next: NextFunction) => {

    const deliveryMethodId = req.params.deliveryMethodId;

    return DeliveryMethod.findById(deliveryMethodId)
        .then((deliveryMethod) => {
            if (deliveryMethod) {
                deliveryMethod.set(req.body);

                return deliveryMethod.save()
                    .then(deliveryMethod => res.status(200).json({ deliveryMethod }))
                    .catch(err => res.status(500).json({ err }));
            } else {
                return res.status(404).json({ message: 'Not found' });
            }
        })
        .catch(err => res.status(500).json({ err }));
}
const deleteDeliveryMethod = (req: Request, res: Response, next: NextFunction) => {

    const deliveryMethodId = req.params.deliveryMethodId;

    return DeliveryMethod.findByIdAndDelete(deliveryMethodId)
        .then(deliveryMethod => deliveryMethod ? res.status(204).json({ message: 'deleted' })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

export default { createDeliveryMethod, readDeliveryMethod, readAllDeliveryMethodItems, updateDeliveryMethod, deleteDeliveryMethod }
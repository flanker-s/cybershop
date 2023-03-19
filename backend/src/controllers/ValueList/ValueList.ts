import { Request, Response, NextFunction } from 'express';
import ValueList from '../../models/ValueList.js';

const createValueList = (req: Request, res: Response, next: NextFunction) => {

    const { name } = req.body;
    const valueList = new ValueList({ name });

    return valueList.save()
        .then(valueList => res.status(201).json({ valueList }))
        .catch(err => res.status(500).json({ err }));
}

const readValueList = (req: Request, res: Response, next: NextFunction) => {

    const valueListId = req.params.valueListId;

    return ValueList.findById(valueListId)
        .then(valueList => valueList ? res.status(200).json({ valueList })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

const readAllValueListItems = (req: Request, res: Response, next: NextFunction) => {
    return ValueList.find()
        .then(valueListItems => res.status(200).json({ valueListItems }))
        .catch(err => res.status(500).json({ err }));
}

const updateValueList = (req: Request, res: Response, next: NextFunction) => {

    const valueListId = req.params.valueListId;

    return ValueList.findById(valueListId)
        .then((valueList) => {
            if (valueList) {
                valueList.set(req.body);

                return valueList.save()
                    .then(valueList => res.status(200).json({ valueList }))
                    .catch(err => res.status(500).json({ err }));
            } else {
                return res.status(404).json({ message: 'Not found' });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const deleteValueList = (req: Request, res: Response, next: NextFunction) => {

    const valueListId = req.params.valueListId;

    return ValueList.findByIdAndDelete(valueListId)
        .then(valueList => valueList ? res.status(204).json({ message: 'deleted' })
            : res.status(404).json({ message: 'Not found' }))
        .catch(err => res.status(500).json({ err }));
}

export default { createValueList, readValueList, readAllValueListItems, updateValueList, deleteValueList }
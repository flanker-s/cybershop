import { Request, Response, NextFunction } from 'express';
import ValueList from '../../models/ValueList.js';

const createOption = (req: Request, res: Response, next: NextFunction) => {

    const { valueListId } = req.params;
    const { value } = req.body;
    const option = {
        value
    }

    return ValueList.findOneAndUpdate({ _id: valueListId })
        .then((valueList) => {
            if (valueList) {
                const newOption = valueList.options.create(option);
                return res.status(201).json(newOption);
            } else {
                return res.status(404).json({ message: "ValueList no found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const readOption = (req: Request, res: Response, next: NextFunction) => {

    const { valueListId, optionId } = req.params;

    return ValueList.findById(valueListId)
        .then((valueList) => {
            if (valueList) {
                const option = valueList.options.id(optionId);
                if (option) {
                    return res.status(200).json(option);
                } else {
                    return res.status(404).json({ message: "ValueList option not found" });
                }
            } else {
                return res.status(404).json({ message: "ValueList not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const readAllOptionItems = (req: Request, res: Response, next: NextFunction) => {

    const { valueListId } = req.params;

    return ValueList.findById(valueListId)
        .then((valueList) => {
            if (valueList) {
                const optionItems = valueList.options;
                return res.status(200).json({ optionItems });
            } else {
                return res.status(404).json({ message: `ValueList with an id:${valueListId} not found.` });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const updateOption = (req: Request, res: Response, next: NextFunction) => {

    const { valueListId, optionId } = req.params;

    return ValueList.findById(valueListId)
        .then((valueList) => {
            if (valueList) {
                const option = valueList.options.id(optionId);
                if (option) {
                    option.set(req.body);
                    return valueList.save()
                        .then(() => res.status(200).json(option))
                        .catch((err) => res.status(500).json({ err }));
                } else {
                    return res.status(404).json({ message: "ValueList option not found" });
                }
            } else {
                return res.status(404).json({ message: "ValueList not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

const deleteOption = (req: Request, res: Response, next: NextFunction) => {

    const { valueListId, optionId } = req.params;

    return ValueList.findOneAndUpdate({ _id: valueListId })
        .then((valueList) => {
            if (valueList) {
                const initOptionCount = valueList.options.length;
                const remainedItems = valueList.options.remove(optionId);

                if (remainedItems.length !== initOptionCount) {
                    return res.status(204).json("deleted");
                } else {
                    return res.status(404).json({ message: "ValueList option not found" });
                }
            } else {
                return res.status(404).json({ message: "ValueList not found" });
            }
        })
        .catch(err => res.status(500).json({ err }));
}

export default {
    createOption,
    readOption,
    readAllOptionItems,
    updateOption,
    deleteOption
}
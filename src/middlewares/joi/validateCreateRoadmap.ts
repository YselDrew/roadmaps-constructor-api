import { NextFunction, Request, Response } from 'express';
import { Schema, ValidationResult } from 'joi';

import { IValidationErrorResponse } from '../../interfaces/joi/validationErrorResponse';
import formatErrors from '../../libs/joi/formatErrors';
import createRoadmapBody from '../../libs/joi/schemas/roadmaps/createRoadmapBody';

export default (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;

  const { error }: ValidationResult<Schema> = createRoadmapBody.validate(body);

  if (error) {
    const errors: IValidationErrorResponse[] = formatErrors(error);
    return res.status(400).json(errors);
  }

  return next();
};

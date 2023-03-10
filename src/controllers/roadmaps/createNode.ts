import { NextFunction, Request, Response } from 'express';

import createNode from '../../services/roadmaps/createNode';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { 
    body: {
      name,
      parentNodeId,
      noteId, // do I need this?
    }, 
    params: { id }
  } = req;

  try {
    await createNode({ 
      name, 
      roadmapId: Number(id), 
      parentNodeId, 
      noteId: Number(noteId) || null, // 0 will be checked in validation
    });

    return res.status(201).json();
  } catch (error) {
    return next(error);
  }
};

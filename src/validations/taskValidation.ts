import Joi from 'joi';

// Validation schema for creating task
const createTaskSchema = Joi.object({
  title: Joi.string().max(100).required(),
  checklistItems: Joi.array().items(
    Joi.object({
      text: Joi.string().required(),
      completed: Joi.boolean().default(false)
    })
  ).min(1).max(5).required(),
  
});

// Validation schema for updating task
const updateTaskSchema = Joi.object({
  title: Joi.string().max(100),
  checklistItems: Joi.array().items(
    Joi.object({
      _id: Joi.string().optional(),
      text: Joi.string().required(),
      completed: Joi.boolean()
    })
  )
}).min(1).max(5); // At least one field should be present

// Validation schema for updating checklist items
const updateChecklistItemsSchema = Joi.object({
  taskId: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      _id: Joi.string().required(),
      completed: Joi.boolean().required(),
      text: Joi.string().required()
    })
  ).min(1).required()
});

export {
  createTaskSchema,
  updateTaskSchema,
  updateChecklistItemsSchema
}; 
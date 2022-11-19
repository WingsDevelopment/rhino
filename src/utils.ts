import { RhinoCommand } from "./enums/command";
import { DTONames } from "./utils/consoleInputUtils";

export const getDTONames = (options: any) => {
  const dtoNames: DTONames = {};
  if (options.create !== undefined) {
    dtoNames.create = options.create;
  }
  if (options.update !== undefined) {
    dtoNames.update = options.update;
  }
  if (options.details !== undefined) {
    dtoNames.details = options.details;
  }
  if (options.all !== undefined) {
    dtoNames.list = options.all;
  }
  if (options.del !== undefined) {
    dtoNames.delete = options.del;
  }
  return dtoNames;
};

export const getCommands = (options: any) => {
  const commands: RhinoCommand[] = [];
  if (options.create !== undefined) {
    commands.push(RhinoCommand.create);
  }
  if (options.update !== undefined) {
    commands.push(RhinoCommand.update);
  }
  if (options.details !== undefined) {
    commands.push(RhinoCommand.details);
  }
  if (options.all !== undefined) {
    commands.push(RhinoCommand.list);
  }
  if (options.del !== undefined) {
    commands.push(RhinoCommand.delete);
  }
  return commands;
};

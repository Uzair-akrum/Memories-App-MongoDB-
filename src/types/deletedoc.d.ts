interface IDelete {
  acknowledged: boolean;
  deletedCount: number;
}
interface IUpdate {
  acknowledged: boolean;
  updatedCount: number;
}

export { IDelete, IUpdate };

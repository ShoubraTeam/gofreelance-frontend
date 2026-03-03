import { useState } from 'react';

interface UseItemManagerReturn<T> {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  selectedItem: T | undefined;
  handleEdit: (item: T) => void;
  handleAdd: () => void;
  handleDelete: (key: string) => void;
  confirmDelete: () => void;
}

export function useItemManager<T>(
  onDelete: (key: string) => void
): UseItemManagerReturn<T> {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<T | undefined>();

  const handleEdit = (item: T) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedItem(undefined);
    setDialogOpen(true);
  };

  const handleDelete = (key: string) => {
    setItemToDelete(key);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      onDelete(itemToDelete);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  return {
    dialogOpen,
    setDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    selectedItem,
    handleEdit,
    handleAdd,
    handleDelete,
    confirmDelete,
  };
}

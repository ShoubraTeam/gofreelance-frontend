'use client';

import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { addProject, editProject } from '@/lib/api/profile';
import type { ProjectDetail } from '@/lib/types/profile';
import toast from 'react-hot-toast';

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileId: string;
  project?: ProjectDetail;
  onSuccess: () => void;
  onDelete?: () => void;
}

export function ProjectDialog({
  open,
  onOpenChange,
  profileId,
  project,
  onSuccess,
  onDelete,
}: ProjectDialogProps) {
  const [title, setTitle] = useState(project?.title || '');
  const [content, setContent] = useState(project?.content || '');
  const [imageUrl, setImageUrl] = useState(project?.imageUrl || '');
  const [projectUrl, setProjectUrl] = useState(project?.projectUrl || '');
  const [fileUrl, setFileUrl] = useState(project?.fileUrl || '');

  useEffect(() => {
    if (open) {
      setTitle(project?.title || '');
      setContent(project?.content || '');
      setImageUrl(project?.imageUrl || '');
      setProjectUrl(project?.projectUrl || '');
      setFileUrl(project?.fileUrl || '');
    }
  }, [open, project]);

  const { mutate, isPending } = useMutation({
    mutationFn: project ? editProject : addProject,
    onSuccess: () => {
      toast.success(`Project ${project ? 'updated' : 'added'} successfully`);
      onOpenChange(false);
      onSuccess();
    },
    onError: () => {
      toast.error('Failed to save project');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      profileId,
      title,
      content: content || undefined,
      imageUrl: imageUrl || undefined,
      projectUrl: projectUrl || undefined,
      fileUrl: fileUrl || undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{project ? 'Edit' : 'Add'} Project</DialogTitle>
            <DialogDescription>
              {project
                ? 'Update your project details'
                : 'Add a new project to your portfolio'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4 max-h-[500px] overflow-y-auto">
            <div className="space-y-2">
              <Label htmlFor="title">
                Project Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. E-commerce Platform"
                required
                disabled={isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Description</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Describe your project, technologies used, and your role..."
                disabled={isPending}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.png"
                disabled={isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectUrl">Project URL</Label>
              <Input
                id="projectUrl"
                type="url"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                placeholder="https://example.com"
                disabled={isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fileUrl">File URL</Label>
              <Input
                id="fileUrl"
                type="url"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="https://example.com/document.pdf"
                disabled={isPending}
              />
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between items-center w-full">
            {project && onDelete ? (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onDelete}
                  disabled={isPending}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  Delete project
                </Button>
                <Button type="submit" disabled={isPending || !title}>
                  {isPending ? 'Saving...' : 'Save'}
                </Button>
              </>
            ) : (
              <Button type="submit" disabled={isPending || !title} className="ml-auto">
                {isPending ? 'Saving...' : 'Save'}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

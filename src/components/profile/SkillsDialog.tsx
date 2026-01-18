'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { addSkills, deleteSkills, getAllSkills } from '@/lib/api/profile';
import type { Skill } from '@/lib/types/profile';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { FiSearch, FiX } from 'react-icons/fi';

interface SkillsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileId: string;
  currentSkills: Skill[];
  onSuccess: () => void;
}

export function SkillsDialog({
  open,
  onOpenChange,
  profileId,
  currentSkills,
  onSuccess,
}: SkillsDialogProps) {
  const [selectedSkillIds, setSelectedSkillIds] = useState<Set<string>>(
    new Set(currentSkills.map((s) => s.id))
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: allSkillsData, isLoading: isLoadingSkills } = useQuery({
    queryKey: ['all-skills'],
    queryFn: getAllSkills,
    enabled: open,
  });

  // Reset local state when dialog opens - this is intentional and safe
  useEffect(() => {
    if (open) {
       
      setSelectedSkillIds(new Set(currentSkills.map((s) => s.id)));
       
      setSearchTerm('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const { mutate: updateSkills, isPending } = useMutation({
    mutationFn: async () => {
      const currentIds = new Set(currentSkills.map((s) => s.id));
      const toAdd = Array.from(selectedSkillIds).filter((id) => !currentIds.has(id));
      const toRemove = Array.from(currentIds).filter((id) => !selectedSkillIds.has(id));

      if (toAdd.length > 0) {
        await addSkills({ profileId, skillsId: toAdd });
      }
      if (toRemove.length > 0) {
        await deleteSkills({ profileId, skillsId: toRemove });
      }
    },
    onSuccess: () => {
      toast.success('Skills updated successfully');
      onOpenChange(false);
      onSuccess();
    },
    onError: () => {
      toast.error('Failed to update skills');
    },
  });

  const handleAddSkill = (skillId: string) => {
    setSelectedSkillIds((prev) => {
      const newSet = new Set(prev);
      newSet.add(skillId);
      return newSet;
    });
    setSearchTerm('');
    inputRef.current?.focus();
  };

  const handleRemoveSkill = (skillId: string) => {
    setSelectedSkillIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(skillId);
      return newSet;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSkills();
  };

  const allSkills = useMemo(() => allSkillsData?.data || [], [allSkillsData?.data]);

  const selectedSkills = useMemo(() => {
    return allSkills.filter((skill) => selectedSkillIds.has(skill.id));
  }, [allSkills, selectedSkillIds]);

  const availableSkills = useMemo(() => {
    if (!searchTerm.trim()) return [];

    return allSkills
      .filter(
        (skill) =>
          !selectedSkillIds.has(skill.id) &&
          skill.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 10);
  }, [allSkills, searchTerm, selectedSkillIds]);

  const selectedCount = selectedSkillIds.size;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Manage Skills</DialogTitle>
            <DialogDescription>
              Type to search and add skills to your profile
              {selectedCount > 0 && ` (${selectedCount} selected)`}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            {isLoadingSkills ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      ref={inputRef}
                      type="text"
                      placeholder="Search and add skills..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(e.target.value.trim().length > 0);
                      }}
                      onFocus={() => setShowDropdown(searchTerm.trim().length > 0)}
                      onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                      className="pl-9"
                      disabled={isPending}
                    />
                    {showDropdown && availableSkills.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-[200px] overflow-y-auto">
                        {availableSkills.map((skill) => (
                          <div
                            key={skill.id}
                            className="px-3 py-2 hover:bg-accent cursor-pointer transition-colors"
                            onClick={() => handleAddSkill(skill.id)}
                          >
                            <span className="text-sm">{skill.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedSkills.length > 0 && (
                    <div className="border border-border rounded-md p-3 min-h-[100px] max-h-[300px] overflow-y-auto">
                      <div className="flex flex-wrap gap-2">
                        {selectedSkills.map((skill) => (
                          <Badge
                            key={skill.id}
                            className="pl-3 pr-1 py-1 text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/15"
                          >
                            {skill.name}
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(skill.id)}
                              className="ml-2 hover:bg-primary/30 rounded-full p-0.5"
                              disabled={isPending}
                            >
                              <FiX className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedSkills.length === 0 && (
                    <div className="border border-dashed border-border rounded-md p-8 text-center">
                      <p className="text-sm text-muted-foreground">
                        No skills selected. Type above to search and add skills.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || isLoadingSkills}>
              {isPending ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

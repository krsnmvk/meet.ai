'use cient';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AgentGetOne } from '../../types';
import { useForm } from 'react-hook-form';
import { agentsSchema, AgentsSchema } from '../../validation/agents-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import GeneratedAvatar from '@/app/_components/generated-avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type Props = {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
};

export default function AgentForm({
  initialValues,
  onCancel,
  onSuccess,
}: Props) {
  const form = useForm<AgentsSchema>({
    resolver: zodResolver(agentsSchema),
    defaultValues: {
      intructions: initialValues?.intructions ?? '',
      name: initialValues?.name ?? '',
    },
  });

  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const { mutate: mutateCreate, isPending: isPendingCreate } = useMutation(
    trpc.agents.create.mutationOptions()
  );

  const { mutate: mutateUpdate, isPending: isPendingUpdate } = useMutation(
    trpc.agents.update.mutationOptions()
  );

  const isEdit = !!initialValues?.id;

  function onSubmit(values: AgentsSchema) {
    if (isEdit) {
      mutateUpdate(
        { ...values, id: initialValues.id },
        {
          onSuccess: async () => {
            if (initialValues?.id) {
              await queryClient.invalidateQueries(
                trpc.agents.getOne.queryOptions({ id: initialValues.id })
              );
            } else {
              await queryClient.invalidateQueries(
                trpc.agents.getMany.queryOptions({})
              );
            }

            toast.success('Agent created');

            onSuccess?.();
          },

          onError: (err) => {
            toast.error(err.message);
          },
        }
      );
    } else {
      mutateCreate(values, {
        onSuccess: async () => {
          await queryClient.invalidateQueries(
            trpc.agents.getMany.queryOptions({})
          );
          toast.success('Agent created');

          onSuccess?.();
        },

        onError: (err) => {
          toast.error(err.message);
        },
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <GeneratedAvatar
          seed={form.watch('name')}
          variant="bottsNeutral"
          className="border size-16"
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  disabled={isPendingCreate || isPendingUpdate}
                  placeholder="e.g. Math Tutor"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="intructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intructions</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPendingCreate || isPendingUpdate}
                  cols={5}
                  placeholder="You are a helpful math assistant that can answer questions and help with assingments"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          {onCancel && (
            <Button
              type="button"
              disabled={isPendingCreate || isPendingUpdate}
              onClick={() => onCancel()}
              variant="ghost"
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isPendingCreate || isPendingUpdate}>
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

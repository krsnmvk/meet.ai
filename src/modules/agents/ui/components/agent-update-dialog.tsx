import ResponsiveDialog from '@/app/_components/responsive-dialog';
import AgentForm from './agent-form';
import { AgentGetOne } from '../../types';

type Props = {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  initialValues: AgentGetOne;
};

export default function AgentUpdateDialog({
  isOpen,
  onOpenChange,
  initialValues,
}: Props) {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit the agent details"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
}

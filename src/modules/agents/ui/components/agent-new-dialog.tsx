import ResponsiveDialog from '@/app/_components/responsive-dialog';
import AgentForm from './agent-form';

type Props = {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AgentNewDialog({ isOpen, onOpenChange }: Props) {
  return (
    <ResponsiveDialog
      title="New Agent"
      description="Create a new agent"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
}

import * as LucideIcons from 'lucide-react';

interface DynamicIconProps extends LucideIcons.LucideProps {
  name: string;
}


const DynamicIcon = ({ name, size = 16, className = "", ...props }: DynamicIconProps) => {
  const IconComponent = (LucideIcons as any)[name];

  if (!IconComponent) {
    return <LucideIcons.Package size={size} className={className} {...props} />;
  }

  return <IconComponent size={size} className={className} {...props} />;
};

export default DynamicIcon; // Ou exporte como default aqui embaixo
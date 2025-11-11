import React from 'react';
import TextAnimationWrapper from './TextAnimationWrapper';

// HOC to wrap components with header animations
const withHeaderAnimation = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithHeaderAnimation: React.FC<P> = (props) => {
    return <WrappedComponent {...props} />;
  };

  // Add a display name for debugging
  WithHeaderAnimation.displayName = `withHeaderAnimation(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithHeaderAnimation;
};

// Utility function to wrap text with animation
export const AnimatedText: React.FC<{
  children: React.ReactNode;
  type?: 'stagger' | 'fade' | 'slide';
  className?: string;
}> = ({ children, type = 'stagger', className = '' }) => {
  return (
    <TextAnimationWrapper animationType={type} className={className}>
      {children}
    </TextAnimationWrapper>
  );
};

export default withHeaderAnimation;
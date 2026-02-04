import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

// Multi-color Google "G" icon (suitable for sign-in buttons)
// Usage: <GoogleIcon width={24} height={24} />

type Props = SvgProps & { className?: string };

const GoogleIcon = React.forwardRef<React.ComponentRef<typeof Svg>, Props>(
    ({ className, width = 24, height = 24, ...rest }, ref) => (
        <Svg
            ref={ref}
            viewBox="0 0 533.5 544.3"
            width={width}
            height={height}
            {...(rest as SvgProps)}
            // NativeWind transforms `className` at build-time; cast to any for TS compatibility
            className={className as unknown as any}
            accessible
            accessibilityLabel="Google"
        >
            <Path
                fill="#4285F4"
                d="M533.5 278.4c0-17.4-1.4-34.2-4.1-50.4H272v95.5h147.5c-6.4 34.6-25.5 63.9-54.5 83.5v69.3h87.9c51.4-47.4 81.6-117.4 81.6-197.9z"
            />
            <Path
                fill="#34A853"
                d="M272 544.3c73.5 0 135.3-24.4 180.4-66.4l-87.9-69.3c-24.4 16.4-55.8 26-92.5 26-71 0-131.2-47.9-152.8-112.3H34.9v70.7C79.6 482.5 169 544.3 272 544.3z"
            />
            <Path
                fill="#FBBB04"
                d="M119.2 324.9c-10.8-32-10.8-66.6 0-98.6V155.6H34.9c-39.6 77.3-39.6 167.1 0 244.4l84.3-75.1z"
            />
            <Path
                fill="#EA4335"
                d="M272 108.1c41.8 0 79.4 14.4 109 42.6l81.6-81.6C403.1 27 343.5 0 272 0 169 0 79.6 61.8 34.9 155.6l84.3 70.7C140.8 156 201 108.1 272 108.1z"
            />
        </Svg>
    )
);

GoogleIcon.displayName = "GoogleIcon";
export default GoogleIcon;
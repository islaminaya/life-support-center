type AppLogoIconProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'>;

export default function AppLogoIcon(props: AppLogoIconProps) {
    return <img src="/images/logo.png" alt="logo" {...props} />;
}

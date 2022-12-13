// routing
import Routes from 'routes';

// project imports
import Locales from 'uiComponent/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import RTLLayout from 'uiComponent/RTLLayout';
import Snackbar from 'uiComponent/extended/Snackbar';
import ThemeCustomization from 'themes';

// auth provider
import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';

// ==============================|| APP ||============================== //

const App = () => (
    <ThemeCustomization>
        {/* RTL layout */}
        <RTLLayout>
            <Locales>
                <NavigationScroll>
                    <AuthProvider>
                        <>
                            <Routes />
                            <Snackbar />
                        </>
                    </AuthProvider>
                </NavigationScroll>
            </Locales>
        </RTLLayout>
    </ThemeCustomization>
);

export default App;

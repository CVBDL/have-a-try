from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

BROWSERS = {
    'android_chrome': {
        'chromeOptions': {
            'androidPackage': 'com.android.chrome'
        }
    },
    'windows_chrome': {
      'chrome': DesiredCapabilities.CHROME
    },
    'windows_ie': DesiredCapabilities.INTERNETEXPLORER,
    'windows_edge': DesiredCapabilities.EDGE,
    'mac_safari': DesiredCapabilities.SAFARI,
}

BROWSERS["windows_ie"]['ignoreZoomSetting'] = True
BROWSERS["windows_ie"]['ignoreProtectedModeSettings'] = True

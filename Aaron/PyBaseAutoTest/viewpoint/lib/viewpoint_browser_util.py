import configparser
import os
import time
import platform

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from .viewpoint_webdriver import BROWSERS
from viewpoint.lib.viewpoint_global import Global
from viewpoint.lib.viewpoint_solution import get_value_csv


class ViewPointTestUtil(object):
    def __init__(self):
        config = configparser.RawConfigParser()
        dir_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        config.read(os.path.abspath(dir_path + '/config/config.properties'))
        platform_os = config.get('PlatfromSection', 'platform.os')
        browser_name = config.get('PlatfromSection', 'platform.browser')
        self.webdriver_url = config.get('UrlSection', 'url.webdriver')
        self.viewpoint_url = config.get('UrlSection', 'url.viewpointserver')
        self.browser_info = platform_os + "_" + browser_name

        self.inject_js_files = [
            dir_path + '/javascripts/FTViewPointOAL.js',
            dir_path + '/javascripts/FTVPActors.js',
            dir_path + '/javascripts/browser_utils.js'
        ]

    def openBrowser(self):
        if get_value_csv(Global().caseName)['%DeviceSystem'] == 'Windows':
            if platform.system() == 'Windows':
                self.browser = webdriver.Chrome(
                    '')
            else:
                self.browser = webdriver.Chrome(
                    '/Users/ftvp/Desktop/have-a-try/Aaron/PyBaseAutoTest/webdrivers/chromedriver')
        else:
            self.browser = webdriver.Remote(
                command_executor=self.webdriver_url,
                desired_capabilities=BROWSERS[self.browser_info]
            )

    def closeBrowser(self):
        if self.browser is not None:
            self.browser.quit()

    def injectJSCode(self, path):
        js_lines = []
        file = open(os.path.abspath(path))
        for line in file:
            js_lines.append(line)

        self.browser.execute_script('\n'.join(js_lines))

    def initHelper(self):
        time.sleep(1)

        for path in self.inject_js_files:
            self.injectJSCode(path)
        time.sleep(1)

    def openPage(self, url='/FTVP'):
        self.browser.get(self.viewpoint_url + url)
        self.initHelper()

    def openMWPage(self, url='/FTVP/M'):
        self.browser.get(self.viewpoint_url + url)

    def navigateByButton(self, button_name):
        self.clickVPButton(button_name)
        time.sleep(5)
        try:
            WebDriverWait(self.browser, 10).until(
                EC.presence_of_element_located((By.ID, "obj1"))
            )
        finally:
            self.initHelper()

    def clickVPButton(self, name):
        code = 'mouseClick("{0}")'.format(name)
        self.browser.execute_script(code)

    def pressVPButton(self, name):
        code = 'mousePress("{0}")'.format(name)
        self.browser.execute_script(code)

    def releaseVPButton(self, name):
        code = 'mouseRelease("{0}")'.format(name)
        self.browser.execute_script(code)

    def waitDisplayUpdate(self, name, property, expect_value, timeout=20):
        n = min(int(timeout / 0.2), 50)
        for i in range(n):
            value = self.browser.execute_script('return FTVPGetElementProperty("{0}", "{1}")'.format(name, property))
            if value == expect_value:
                return True
            time.sleep(0.2)
        return False

    def getElementProperty(self, name, property):
        return self.browser.execute_script('return FTVPGetElementProperty("{0}", "{1}")'.format(name, property))

    def setElementProperty(self, name, property, value, isDigit=False):
        if isDigit:
            self.browser.execute_script('FTVPSetElementProperty("{0}", "{1}", {2});'.format(name, property, value))
        else:
            self.browser.execute_script('FTVPSetElementProperty("{0}", "{1}", "{2}");'.format(name, property, value))

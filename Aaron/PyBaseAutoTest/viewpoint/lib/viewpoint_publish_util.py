import configparser
import os
import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from .viewpoint_webdriver import BROWSERS
from viewpoint.lib.viewpoint_global import Global
from viewpoint.lib.viewpoint_solution import get_value_csv


class ViewpointPublishUtil(object):
    def __init__(self):
        config = configparser.RawConfigParser()
        dir_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        config.read(os.path.abspath(dir_path + '/config/config.properties'))
        platform_os = config.get('PlatfromSection', 'platform.os')
        if platform_os == 'android':
            platform_os = 'windows'
        browser_name = config.get('PlatfromSection', 'platform.browser')
        self.webdriver_url = config.get('UrlSection', 'url.webdriver')
        self.viewpoint_url = config.get('UrlSection', 'url.viewpointserver')
        self.browser_info = platform_os + "_" + browser_name

    def openBrowser(self):
        self.browser = webdriver.Remote(
            command_executor=self.webdriver_url,
            desired_capabilities=BROWSERS[self.browser_info])

    def closeBrowser(self):
        if self.browser is not None:
            self.browser.quit()

    def wait_element_by_id(self, element, timeout=10):
        time.sleep(1)
        try:
            element = WebDriverWait(self.browser, timeout).until(
                EC.visibility_of_element_located((By.ID, element)))
        finally:
            return True

    def publish(self, timeout=500):
        if Global().needPublish is False:
            return
        time.sleep(30)
        self.openBrowser()
        self.browser.get(self.viewpoint_url + "/FTVP/admin")
        self.wait_element_by_id('obj1', 10)
        htmlUrl = self.browser.execute_script(
            "return document.getElementById('obj1').data")
        self.browser.get(htmlUrl)

        # Home
        self.wait_element_by_id('hpStartButton', 10)
        publishDisplayToWeb = self.browser.find_element_by_id('hpStartButton')
        publishDisplayToWeb.click()

        # Select an application
        time.sleep(10)
        self.wait_element_by_id('comboSelectScope', 10)
        self.browser.find_element_by_xpath(
            "//select[@id='comboSelectScope']/option[text()='" + get_value_csv(Global().caseName)['%appTypeCsv'] + "']"
        ).click()
        time.sleep(5)
        self.browser.find_element_by_xpath(
            "//select[@id='comboSelectApplication']/option[text()='" +
            get_value_csv(Global().caseName)['%SD_App_NameCsv'] + "']"
        ).click()
        time.sleep(5)
        self.browser.find_element_by_id('btnNext').click()

        # Select InitDisplay
        time.sleep(10)
        for initValue in self.browser.find_elements_by_name('initialDisplay'):
            if initValue.get_attribute('value') == get_value_csv(Global().caseName)['%initialDisplayCsv']:
                initValue.click()

        # Publish displays
        time.sleep(2)
        self.wait_element_by_id('btnNext', 10)
        self.browser.find_element_by_id('btnNext').click()

        # Wait until finised
        self.wait_element_by_id('nextArrow', timeout)

        self.closeBrowser()

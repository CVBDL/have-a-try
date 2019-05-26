import configparser
import os
import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from .viewpoint_webdriver import BROWSERS


class ViewpointPublishUtil(object):

    def __init__(self):
        config = configparser.RawConfigParser()
        config.read(os.path.abspath('./config/config.properties'))
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
            desired_capabilities=BROWSERS[self.browser_info]
        )

    def closeBrowser(self):
        if self.browser is not None:
            self.browser.quit()

    def wait_element_by_id(self, element, timeout=10):
        time.sleep(1)
        try:
            element = WebDriverWait(self.browser, timeout).until(
                EC.visibility_of_element_located((By.ID, element))
            )
        finally:
            return True

    def publish(self, module, timeout=500):
        projectName = module.split('.')[-1].lower()
        config = configparser.RawConfigParser()
        config.read(os.path.abspath('./config/config.properties'))
        applicationType = config.get('PublishSection', projectName + '.type')
        applicationName = config.get('PublishSection', projectName + '.name')
        needPublish = True if config.get('PublishSection', projectName + '.publish') == '1' else False
        if needPublish is False:
            return
        self.openBrowser()
        self.browser.get(self.viewpoint_url + "/FTVP/admin")
        self.wait_element_by_id('obj1', 10)
        htmlUrl = self.browser.execute_script("return document.getElementById('obj1').data")
        self.browser.get(htmlUrl)

        # Home
        self.wait_element_by_id('hpStartButton', 10)
        publishDisplayToWeb = self.browser.find_element_by_id('hpStartButton')
        publishDisplayToWeb.click()

        # Select an application
        time.sleep(10)
        self.wait_element_by_id('comboSelectScope', 10)
        self.browser.find_element_by_xpath(
            "//select[@id='comboSelectScope']/option[text()='" + applicationType + "']"
        ).click()
        time.sleep(5)
        self.browser.find_element_by_xpath(
            "//select[@id='comboSelectApplication']/option[text()='" + applicationName + "']"
        ).click()

        self.browser.find_element_by_id('btnNext').click()

        # Select displays
        time.sleep(10)
        self.wait_element_by_id('btnNext', 10)
        self.browser.find_element_by_id('btnNext').click()

        self.wait_element_by_id('nextArrow', timeout)

        self.closeBrowser()

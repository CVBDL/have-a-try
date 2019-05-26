from viewpoint.tests.base_test import BaseTestCase
from selenium import webdriver
import time
from selenium.common.exceptions import NoSuchElementException


class TestWorkflow06(BaseTestCase):

    def test_button03(self, util):
        """
        :type util: viewpoint.lib.viewpoint_browser_util.ViewPointTestUtil
        """
        # util.openMWPage()
        # util.browser.find_element_by_Xpath("//*[@id='vpBody']/div/section/section[2]/section/section/div/div/div/div[1]/a/div/div[2]/div").click()
        # util.browser.find_element_by_class_name('ra-list-label-name')
        # util.browser.find_element_by_xpath('//*[@id="vpBody"]/div/section/section[1]/header[2]/ra-navbar-large/div/div/div[1]/div/a[1]')
        # print(abc.get_attribute("class"))
        browser = webdriver.Chrome()
        browser.get("http://localhost/ftvp/m")
        # browser.implicitly_wait(6000)
        time.sleep(6)
        browser.find_element_by_xpath('//*[@id="vpBody"]/div/section/section[2]/section/section/div/div/div/div[1]/a/div/div[2]/div').click()

import pytest
"""
:test
"""
from viewpoint.lib.viewpoint_browser_util import ViewPointTestUtil
from viewpoint.lib.viewpoint_publish_util import ViewpointPublishUtil


class BaseTestCase(object):
    """
    :test
    """

    def setUp(self):
        """
        :test
        """
        print("setup funciton in BaseTestCase")
        super(BaseTestCase, self).setUp()

    def tearDown(self):
        """
        :test
        """
        print("tearDown funciton in BaseTestCase")
        pass

    @pytest.fixture(scope="function", autouse=True)
    def util(self, request):
        """
        :test
        """
        util_instance = ViewPointTestUtil()
        util_instance.openBrowser()
        yield util_instance
        util_instance.browser.quit()

    @pytest.fixture(scope="module", autouse=True)
    def publish_application(self):
        util_publish = ViewpointPublishUtil()
        util_publish.publish('MerlinTest', 500)

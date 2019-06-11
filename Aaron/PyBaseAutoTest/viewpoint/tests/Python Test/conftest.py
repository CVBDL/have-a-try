# coding:utf-8
import pytest
import sys
rootPath = '/Users/ftvp/Desktop/have-a-try/Aaron/PyBaseAutoTest'
sys.path.append(rootPath)

from viewpoint.lib.viewpoint_browser_util import ViewPointTestUtil
from viewpoint.lib.viewpoint_publish_util import ViewpointPublishUtil


@pytest.fixture(scope="function")
def util():
    """
    :test
    """
    util_instance = ViewPointTestUtil()
    util_instance.openBrowser()
    yield util_instance
    util_instance.browser.quit()


@pytest.fixture(scope="module")
def publish_application():
    util_publish = ViewpointPublishUtil()
    util_publish.publish(500)

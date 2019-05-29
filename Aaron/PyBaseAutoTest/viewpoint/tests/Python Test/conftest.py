# coding:utf-8
import pytest

from viewpoint.lib.viewpoint_browser_util import ViewPointTestUtil
from viewpoint.lib.viewpoint_publish_util import ViewpointPublishUtil
from viewpoint.lib.viewpoint_global import Global

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
    a = Global().caseName
    util_publish = ViewpointPublishUtil()
    initDisplay = Global().caseName
    util_publish.publish(initDisplay, 500)

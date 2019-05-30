import pytest

from viewpoint.tests.base_test import BaseTestCase
from viewpoint.lib.viewpoint_global import Global


@pytest.fixture(scope='module')
def init_global():
    Global().needPublish = True
    Global().caseName = "MerlinTest1"


@pytest.mark.usefixtures("init_global", "publish_application", "util")
class TestWorkflow02(BaseTestCase):
    @pytest.mark.test
    def test_text_caption(self, util):
        """
        :type util: viewpoint.lib.viewpoint_browser_util.ViewPointTestUtil
        """
        util.openPage()
        # util.navigateByButton('Button2')

        assert util.getElementProperty('Text1', 'Caption') == 'Hello world', "Caption should be \"Hello world\""

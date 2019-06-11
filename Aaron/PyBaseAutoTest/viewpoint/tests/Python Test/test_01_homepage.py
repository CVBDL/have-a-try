import sys

rootPath = '/Users/ftvp/Desktop/have-a-try/Aaron/PyBaseAutoTest'
sys.path.append(rootPath)

import pytest

from viewpoint.tests.base_test import BaseTestCase
from viewpoint.lib.viewpoint_global import Global


@pytest.fixture(scope='module')
def init_global():
    Global().needPublish = True
    Global().caseName = "MerlinTest"


@pytest.mark.usefixtures("init_global", "publish_application", "util")
class TestWorkflow01(BaseTestCase):
    @pytest.mark.test
    def test_button_size(self, util):
        """
        :type util: viewpoint.lib.viewpoint_browser_util.ViewPointTestUtil
        """
        util.openPage()
        assert util.getElementProperty(
            'Button1', 'FontSize') == 13, "Font size on homepage should be 13"

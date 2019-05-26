import datetime

from viewpoint.tests.base_test import BaseTestCase


class TestWorkflow16(BaseTestCase):
    def test_dataandtime01(self, util):
        """
        :type util: viewpoint.lib.viewpoint_browser_util.ViewPointTestUtil
        """
        # util.openPage()
        util.navigateByButton('Button7')

        displaytime = util.getElementProperty('TimeDateDisplay1', 'DisplayValue')
        dtsecond = int(displaytime[-5:-3])
        today = datetime.datetime.now()
        # print util.getElementProperty('TimeDateDisplay1', 'DisplayValue')
        if dtsecond - today.second < 2:
            ct = '%s/%s/%s %s:%s:%s' % (today.month, today.day, today.year,
                                        (((today.hour + 11) % 12) + 1), today.minute, dtsecond)
            ap = today.strftime('%p')
            zz = ct + ' ' + ap
            assert displaytime == zz
            pass

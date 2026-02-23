/* global Office, Excel, OfficeRuntime */

Office.onReady(async (info) => {
  if (info.host === Office.HostType.Excel) {
    const rowBtn = document.getElementById("rowBtn") as HTMLInputElement;
    const colBtn = document.getElementById("colBtn") as HTMLInputElement;

    // 1. Load persisted value
    const saved = await OfficeRuntime.storage.getItem("orientation");
    if (saved === "column") colBtn.checked = true;
    else rowBtn.checked = true;

    // 2. Handle changes
    const updateOrientation = async (value: string) => {
      await OfficeRuntime.storage.setItem("orientation", value);
      
      // 3. Force Excel to recalculate functions immediately
      await Excel.run(async (context) => {
        context.workbook.application.calculate("FullRebuild");
        await context.sync();
      });
    };

    rowBtn.onclick = () => updateOrientation("row");
    colBtn.onclick = () => updateOrientation("column");
  }
});

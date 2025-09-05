' VBA Macro for Excel Calendar Automation
' This macro will make your calendar update automatically when year/month changes

Sub SetupAutomaticCalendar()
    Dim ws As Worksheet
    Dim i As Integer
    
    ' Use the active worksheet
    Set ws = ActiveSheet
    
    ' Set up headers
    ws.Range("A1").Value = "年 (Year)"
    ws.Range("B1").Value = 2025
    ws.Range("B1").Interior.ColorIndex = 6 ' Yellow background for input cell
    
    ws.Range("A2").Value = "月 (Month)"
    ws.Range("B2").Value = 1
    ws.Range("B2").Interior.ColorIndex = 6 ' Yellow background for input cell
    
    ' Calendar headers
    ws.Range("A4").Value = "日付 (Date)"
    ws.Range("B4").Value = "曜日 (Day)"
    ws.Range("C4").Value = "売上 (Sales)"
    ws.Range("D4").Value = "メモ (Notes)"
    
    ' Format header row
    With ws.Range("A4:D4")
        .Font.Bold = True
        .Interior.ColorIndex = 15 ' Light gray background
        .Borders.LineStyle = xlContinuous
    End With
    
    ' Add formulas for automatic date and day calculation
    For i = 5 To 35 ' Rows 5 to 35 (31 days)
        Dim dayNum As Integer
        dayNum = i - 4
        
        ' Date formula - creates date from year, month, and day
        ws.Cells(i, 1).Formula = "=IF(" & dayNum & "<=DAY(EOMONTH(DATE($B$1,$B$2,1),0)),DATE($B$1,$B$2," & dayNum & "),"""")"
        
        ' Day of week formula in Japanese
        ws.Cells(i, 2).Formula = "=IF(A" & i & "<>"""",TEXT(A" & i & ",""dddd""),"""")"
        
        ' Format the date cell
        ws.Cells(i, 1).NumberFormat = "yyyy/mm/dd"
        
        ' Add borders to calendar cells
        ws.Range("A" & i & ":D" & i).Borders.LineStyle = xlContinuous
    Next i
    
    ' Auto-adjust column widths
    ws.Columns("A").ColumnWidth = 15
    ws.Columns("B").ColumnWidth = 12
    ws.Columns("C").ColumnWidth = 15
    ws.Columns("D").ColumnWidth = 25
    
    ' Add instructions
    ws.Range("F1").Value = "使用方法:"
    ws.Range("F2").Value = "1. B1セルに年を入力"
    ws.Range("F3").Value = "2. B2セルに月を入力"
    ws.Range("F4").Value = "3. 日付と曜日が自動更新されます"
    
    With ws.Range("F1:F4")
        .Font.Color = RGB(0, 0, 255)
        .Font.Size = 10
    End With
    
    MsgBox "カレンダーの自動化設定が完了しました！" & vbCrLf & _
           "B1セルに年、B2セルに月を入力すると" & vbCrLf & _
           "日付と曜日が自動的に更新されます。", vbInformation, "設定完了"
End Sub

Sub UpdateBothCalendars()
    ' This macro will update both Excel files
    Dim wb1 As Workbook, wb2 As Workbook
    Dim path As String
    
    path = "C:\Users\user\OneDrive\デスクトップ\売上カレンダー\"
    
    ' Update first file
    On Error Resume Next
    Set wb1 = Workbooks.Open(path & "_____.xlsx")
    If Not wb1 Is Nothing Then
        wb1.Activate
        Call SetupAutomaticCalendar
        wb1.Save
        wb1.Close
        MsgBox "_____.xlsx が更新されました", vbInformation
    End If
    
    ' Update second file
    Set wb2 = Workbooks.Open(path & "_________2025.xlsx")
    If Not wb2 Is Nothing Then
        wb2.Activate
        Call SetupAutomaticCalendar
        wb2.Save
        wb2.Close
        MsgBox "_________2025.xlsx が更新されました", vbInformation
    End If
    On Error GoTo 0
    
    MsgBox "両方のファイルの更新が完了しました！", vbInformation, "完了"
End Sub
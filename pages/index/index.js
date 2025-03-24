// index.js
Page({
    data: {
      timeSlots: [],
      showModal: false,
      selectedSlotIndex: null,
      inputText: "",
      selectedBlocks: [],
      isSelecting: false
    },
  
    onLoad() {
      this.generateTimeSlots();
    },
  
    generateTimeSlots() {
      const startHour = 8;
      const endHour = 23;
      const interval = 15;
      const timeSlots = [];
      
      for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += interval) {
          timeSlots.push({
            time: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
            mergedRange: null,
            isStartOfHour: minute === 0,
            isEndOfHour: minute === 45,
            hasContent: false,
            content: "",
            isMerged: false,
            style: ""
          });
        }
      }
      this.setData({ timeSlots });
    },
        
  
    handleSlotTap(e) {
      if (!this.data.isSelecting) {
        const index = e.currentTarget.dataset.index;
        const selectedSlot = this.data.timeSlots[index];
        this.setData({
          showModal: true,
          selectedSlotIndex: index,
          inputText: selectedSlot.content || ""
        });
      }
    },
  
    handleLongPress(e) {
        if (!this.data.isSelecting) {
          const index = parseInt(e.currentTarget.dataset.index);
          this.setData({
            isSelecting: true,
            selectedBlocks: [] // 确保初始化为空数组
          }, () => {
            // 调试日志
            console.log('进入选择模式，初始选中:', this.data.selectedBlocks);
            wx.vibrateShort();
          });
        }
      },

    handleSaveContent() {
      const { selectedSlotIndex, timeSlots, inputText } = this.data;
      const current = timeSlots[selectedSlotIndex];
      
      if (current.mergedRange) {
        const [start, end] = current.mergedRange;
        timeSlots.forEach((slot, i) => {
          if (i >= start && i <= end) {
            slot.hasContent = !!inputText;
            slot.content = inputText;
          }
        });
      } else {
        timeSlots[selectedSlotIndex].content = inputText;
        timeSlots[selectedSlotIndex].hasContent = !!inputText;
      }
      
      this.setData({ timeSlots, showModal: false });
    },
  
    handleMergeSelection() {
        const { selectedBlocks, timeSlots } = this.data;
        
        // 新增空选区检查
        if (selectedBlocks.length === 0) {
            wx.showToast({ title: '请先选择时间区块', icon: 'none' });
            return;
        }

        // 自动补全连续区块
        const start = Math.min(...selectedBlocks);
        const end = Math.max(...selectedBlocks);
        const fullBlocks = Array.from({length: end-start+1}, (_,i) => start+i);
        
        // 检查是否需要补全
        if (fullBlocks.length !== selectedBlocks.length) {
          wx.showToast({
            title: `已自动补全 ${fullBlocks.length} 个连续区块`,
            icon: 'none'
          });
        }
      
        const newTimeSlots = timeSlots.map((slot, index) => {
          if (index === start) {
            return {
              ...slot,
              mergedRange: [start, end],
              isMerged: true,
              style: `height: ${(end - start + 1) * 50}px;`
            }
          }
          if (index > start && index <= end) {
            return { 
              ...slot, 
              isMerged: true, 
              style: "display: none;",
              hasContent: false  // 清空子区块内容
            }
          }
          return slot;
        });
      
        this.setData({
          timeSlots: newTimeSlots,
          isSelecting: false,
          selectedBlocks: []
        });
      },
  
    handleCancelSelection() {
      this.setData({
        isSelecting: false,
        selectedBlocks: []
      });
    },
  
    handleSplitBlocks() {
        const { selectedBlocks, timeSlots } = this.data;
        
        if (selectedBlocks.length !== 1) return;
    
        const index = selectedBlocks[0];
        const slot = timeSlots[index];
        
        if (!slot.mergedRange) {
          wx.showToast({ title: '未合并的区块', icon: 'none' });
          return;
        }
    
        // 添加拆分动画效果
        const animation = wx.createAnimation({
          duration: 300,
          timingFunction: 'ease'
        });
        
        const [start, end] = slot.mergedRange;
        const newTimeSlots = timeSlots.map((s, i) => {
          if (i >= start && i <= end) {
            animation.opacity(0).step().opacity(1).step();
            return {
              ...s,
              isMerged: false,
              mergedRange: null,
              style: "",
              hasContent: false,
              content: ""
            }
          }
          return s;
        });
    
        this.setData({
          timeSlots: newTimeSlots,
          selectedBlocks: []
        }, () => {
          this.animation = animation;
          this.animation.translateY(0).step();
          this.setData({
            animationData: this.animation.export()
          });
          
          wx.showToast({
            title: `已拆分${end - start + 1}个区块`,
            icon: 'success'
          });
        });
      },

    // 在onLoad中添加测试数据
    onLoad() {
        this.generateTimeSlots();
        
        // 测试代码（发布时移除）
        setTimeout(() => {
        this.setData({
            isSelecting: true,
            selectedBlocks: [3,4,5]
        });
        }, 1000);
    },
  
    handleCloseModal() {
      this.setData({
        showModal: false,
        selectedSlotIndex: null,
        inputText: ""
      });
    },
  
    handleTextInput(e) {
      this.setData({ inputText: e.detail.value });
    },
    
    stopPropagation() {}
  });

  